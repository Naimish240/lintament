import * as vscode from 'vscode';
import { LintamentService } from './lintamentService';
import { ConfigManager } from './config';

export class LintamentDiagnosticsProvider {
    private lintamentService: LintamentService;
    private configManager: ConfigManager;
    private diagnosticCache: Map<string, vscode.Diagnostic[]> = new Map();

    constructor(lintamentService: LintamentService, configManager: ConfigManager) {
        this.lintamentService = lintamentService;
        this.configManager = configManager;
    }

    async updateDiagnostics(document: vscode.TextDocument, collection: vscode.DiagnosticCollection) {
        if (document.uri.scheme !== 'file') {
            return;
        }

        // Skip very large files
        if (document.getText().length > 100000) {
            return;
        }

        try {
            const code = document.getText();
            const result = await this.lintamentService.analyzeAndFix(code, document.fileName);

            const diagnostics: vscode.Diagnostic[] = [];

            // Create diagnostics for each issue
            result.issues.forEach((issue, index) => {
                // Try to find relevant line (simple heuristic)
                const lines = code.split('\n');
                let line = 0;
                
                // Look for problematic patterns in the issue message
                if (issue.includes('var')) {
                    const varLine = lines.findIndex(l => /\bvar\s+\w+/.test(l));
                    if (varLine >= 0) line = varLine;
                } else if (issue.includes('TODO')) {
                    const todoLine = lines.findIndex(l => /\/\/\s*TODO/gi.test(l));
                    if (todoLine >= 0) line = todoLine;
                } else if (issue.includes('Nested')) {
                    const nestedLine = lines.findIndex(l => /if\s*\([^)]*\)\s*\{[^}]*if\s*\(/.test(l));
                    if (nestedLine >= 0) line = nestedLine;
                }

                const range = new vscode.Range(
                    Math.min(line, document.lineCount - 1),
                    0,
                    Math.min(line, document.lineCount - 1),
                    lines[line]?.length || 0
                );

                const diagnostic = new vscode.Diagnostic(
                    range,
                    issue,
                    vscode.DiagnosticSeverity.Warning
                );
                diagnostic.source = 'lintament';
                diagnostic.code = `lintament-${index}`;
                diagnostics.push(diagnostic);
            });

            // Add a diagnostic if code should be replaced
            if (result.shouldReplace) {
                const firstLine = document.lineAt(0);
                const diagnostic = new vscode.Diagnostic(
                    new vscode.Range(0, 0, 0, firstLine.text.length),
                    `Code quality score: ${result.score.toFixed(2)}. This code should be replaced with ancient wisdom.`,
                    vscode.DiagnosticSeverity.Error
                );
                diagnostic.source = 'lintament';
                diagnostic.code = 'lintament-replace';
                diagnostics.push(diagnostic);
            }

            collection.set(document.uri, diagnostics);
            this.diagnosticCache.set(document.uri.toString(), diagnostics);
        } catch (error) {
            console.error('Error updating diagnostics:', error);
            collection.set(document.uri, []);
        }
    }
}
