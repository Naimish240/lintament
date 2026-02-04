import * as vscode from 'vscode';
import { LintamentService } from './lintamentService';
import { ConfigManager } from './config';
import { WisdomQuotes } from './wisdom';

export class LintamentCodeActionProvider implements vscode.CodeActionProvider {
    private lintamentService: LintamentService;
    private configManager: ConfigManager;

    constructor(lintamentService: LintamentService, configManager: ConfigManager) {
        this.lintamentService = lintamentService;
        this.configManager = configManager;
    }

    provideCodeActions(
        document: vscode.TextDocument,
        range: vscode.Range | vscode.Selection,
        context: vscode.CodeActionContext,
        token: vscode.CancellationToken
    ): vscode.CodeAction[] | undefined {
        const actions: vscode.CodeAction[] = [];

        // Check if there are lintament diagnostics
        const lintamentDiagnostics = context.diagnostics.filter(
            d => d.source === 'lintament'
        );

        if (lintamentDiagnostics.length === 0) {
            return undefined;
        }

        // Add "Replace with Wisdom" action for replace diagnostics
        const replaceDiagnostic = lintamentDiagnostics.find(d => d.code === 'lintament-replace');
        if (replaceDiagnostic) {
            const replaceAction = new vscode.CodeAction(
                'Replace with Ancient Wisdom',
                vscode.CodeActionKind.QuickFix
            );
            replaceAction.diagnostics = [replaceDiagnostic];
            replaceAction.command = {
                command: 'lintament.judge',
                title: 'Replace with Ancient Wisdom'
            };
            actions.push(replaceAction);
        }

        // Add "Consult the Ancients" action for any lintament issue
        if (lintamentDiagnostics.length > 0) {
            const consultAction = new vscode.CodeAction(
                'Consult the Ancients',
                vscode.CodeActionKind.QuickFix
            );
            consultAction.diagnostics = lintamentDiagnostics;
            consultAction.command = {
                command: 'lintament.consult',
                title: 'Consult the Ancients'
            };
            actions.push(consultAction);
        }

        return actions.length > 0 ? actions : undefined;
    }
}
