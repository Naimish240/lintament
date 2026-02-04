import * as vscode from 'vscode';
import { LintamentDiagnosticsProvider } from './diagnostics';
import { LintamentCodeActionProvider } from './codeActions';
import { LintamentService } from './lintamentService';
import { ConfigManager } from './config';
import { WisdomQuotes } from './wisdom';

let diagnosticsProvider: LintamentDiagnosticsProvider;
let codeActionProvider: LintamentCodeActionProvider;
let lintamentService: LintamentService;
let configManager: ConfigManager;

export function activate(context: vscode.ExtensionContext) {
    console.log('Lintament extension is now active. The judgment begins.');

    // Initialize services
    configManager = new ConfigManager();
    lintamentService = new LintamentService(configManager);
    diagnosticsProvider = new LintamentDiagnosticsProvider(lintamentService, configManager);
    codeActionProvider = new LintamentCodeActionProvider(lintamentService, configManager);

    // Register diagnostics provider
    const diagnosticCollection = vscode.languages.createDiagnosticCollection('lintament');
    context.subscriptions.push(diagnosticCollection);
    context.subscriptions.push(
        vscode.workspace.onDidChangeTextDocument((e) => {
            if (e.document.languageId !== 'plaintext') {
                diagnosticsProvider.updateDiagnostics(e.document, diagnosticCollection);
            }
        })
    );
    context.subscriptions.push(
        vscode.workspace.onDidOpenTextDocument((doc) => {
            if (doc.languageId !== 'plaintext') {
                diagnosticsProvider.updateDiagnostics(doc, diagnosticCollection);
            }
        })
    );

    // Register code action provider
    context.subscriptions.push(
        vscode.languages.registerCodeActionsProvider(
            { scheme: 'file' },
            codeActionProvider,
            {
                providedCodeActionKinds: [vscode.CodeActionKind.QuickFix]
            }
        )
    );

    // Register commands
    const judgeCommand = vscode.commands.registerCommand('lintament.judge', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showWarningMessage('No active editor. Open a file to be judged.');
            return;
        }

        await judgeFile(editor.document);
    });

    const judgeWorkspaceCommand = vscode.commands.registerCommand('lintament.judgeWorkspace', async () => {
        const files = await vscode.workspace.findFiles('**/*.{js,ts,jsx,tsx,py,java,go,rs}', '**/node_modules/**');
        
        if (files.length === 0) {
            vscode.window.showInformationMessage('No files found to judge. Your codebase is either empty or perfect.');
            return;
        }

        const result = await vscode.window.showInformationMessage(
            `Found ${files.length} files. Proceed with judgment?`,
            { modal: true },
            'Yes, Judge Them All',
            'Cancel'
        );

        if (result === 'Yes, Judge Them All') {
            await judgeWorkspace(files);
        }
    });

    const consultCommand = vscode.commands.registerCommand('lintament.consult', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showWarningMessage('No active editor.');
            return;
        }

        const selection = editor.selection;
        const text = editor.document.getText(selection.isEmpty ? undefined : selection);
        
        if (!text.trim()) {
            vscode.window.showWarningMessage('Select some code to consult the ancients about.');
            return;
        }

        await consultCode(editor.document, text, selection);
    });

    const regressCommand = vscode.commands.registerCommand('lintament.regress', async () => {
        vscode.window.showInformationMessage('Regress command: Undo functionality would be implemented here.');
        // TODO: Implement undo functionality with history tracking
    });

    context.subscriptions.push(judgeCommand, judgeWorkspaceCommand, consultCommand, regressCommand);

    // Initial diagnostics for open files
    vscode.workspace.textDocuments.forEach((doc) => {
        if (doc.languageId !== 'plaintext') {
            diagnosticsProvider.updateDiagnostics(doc, diagnosticCollection);
        }
    });
}

async function judgeFile(document: vscode.TextDocument) {
    const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBar.text = "$(sync~spin) Consulting the Ancients...";
    statusBar.show();

    try {
        const code = document.getText();
        const result = await lintamentService.analyzeAndFix(code, document.fileName);

        if (result.shouldReplace) {
            const wisdom = WisdomQuotes.getQuote(configManager.getQuoteSource());
            const replacement = result.fixedCode || wisdom;

            const edit = new vscode.WorkspaceEdit();
            const fullRange = new vscode.Range(
                document.positionAt(0),
                document.positionAt(code.length)
            );
            edit.replace(document.uri, fullRange, replacement);

            const applied = await vscode.workspace.applyEdit(edit);
            if (applied) {
                vscode.window.showInformationMessage(
                    `Enlightenment achieved. ${document.fileName} has been transformed.`,
                    'View Changes'
                );
            }
        } else {
            vscode.window.showInformationMessage(
                `Your code has been judged. ${result.issues.length} issues found, but it's not bad enough to warrant replacement.`,
                'View Issues'
            );
        }
    } catch (error: any) {
        vscode.window.showErrorMessage(`Judgment failed: ${error.message}`);
    } finally {
        statusBar.dispose();
    }
}

async function judgeWorkspace(files: vscode.Uri[]) {
    const progressOptions: vscode.ProgressOptions = {
        location: vscode.ProgressLocation.Notification,
        title: "Judging Workspace",
        cancellable: true
    };

    await vscode.window.withProgress(progressOptions, async (progress, token) => {
        let fixedCount = 0;
        let issueCount = 0;

        for (let i = 0; i < files.length; i++) {
            if (token.isCancellationRequested) {
                break;
            }

            const file = files[i];
            progress.report({
                increment: 100 / files.length,
                message: `Judging ${file.fsPath.split(/[/\\]/).pop()}...`
            });

            try {
                const document = await vscode.workspace.openTextDocument(file);
                const code = document.getText();
                const result = await lintamentService.analyzeAndFix(code, file.fsPath);

                if (result.shouldReplace) {
                    const wisdom = WisdomQuotes.getQuote(configManager.getQuoteSource());
                    const replacement = result.fixedCode || wisdom;

                    const edit = new vscode.WorkspaceEdit();
                    const fullRange = new vscode.Range(
                        document.positionAt(0),
                        document.positionAt(code.length)
                    );
                    edit.replace(file, fullRange, replacement);
                    await vscode.workspace.applyEdit(edit);
                    fixedCount++;
                } else {
                    issueCount += result.issues.length;
                }
            } catch (error) {
                console.error(`Error judging ${file.fsPath}:`, error);
            }
        }

        vscode.window.showInformationMessage(
            `Judgment complete. ${fixedCount} files enlightened, ${issueCount} issues found.`
        );
    });
}

async function consultCode(document: vscode.TextDocument, code: string, selection: vscode.Selection) {
    const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBar.text = "$(sync~spin) Seeking wisdom...";
    statusBar.show();

    try {
        const result = await lintamentService.analyzeAndFix(code, document.fileName);
        const wisdom = WisdomQuotes.getQuote(configManager.getQuoteSource());

        const panel = vscode.window.createWebviewPanel(
            'lintamentWisdom',
            'Ancient Wisdom',
            vscode.ViewColumn.Beside,
            {}
        );

        panel.webview.html = getWisdomWebviewContent(wisdom, result.issues, result.fixedCode || code);
    } catch (error: any) {
        vscode.window.showErrorMessage(`Consultation failed: ${error.message}`);
    } finally {
        statusBar.dispose();
    }
}

function getWisdomWebviewContent(wisdom: string, issues: string[], fixedCode?: string): string {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            padding: 20px;
            background: #1e1e1e;
            color: #d4d4d4;
        }
        .wisdom {
            background: #2d2d30;
            border-left: 4px solid #f59e0b;
            padding: 20px;
            margin: 20px 0;
            font-style: italic;
            font-size: 1.2em;
        }
        .issues {
            margin: 20px 0;
        }
        .issue {
            background: #3a1f1f;
            border-left: 4px solid #f48771;
            padding: 10px;
            margin: 10px 0;
        }
        code {
            background: #252526;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Consolas', monospace;
        }
    </style>
</head>
<body>
    <h1>Ancient Wisdom</h1>
    <div class="wisdom">${wisdom}</div>
    ${issues.length > 0 ? `
        <div class="issues">
            <h2>Issues Found:</h2>
            ${issues.map(issue => `<div class="issue">${issue}</div>`).join('')}
        </div>
    ` : ''}
    ${fixedCode ? `
        <h2>Suggested Fix:</h2>
        <pre><code>${fixedCode}</code></pre>
    ` : ''}
</body>
</html>`;
}

export function deactivate() {
    console.log('Lintament extension deactivated. The judgment ends.');
}
