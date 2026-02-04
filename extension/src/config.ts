import * as vscode from 'vscode';

export type WisdomLevel = 'gentle' | 'firm' | 'maximum' | 'ruthless';
export type QuoteSource = 'sun-tzu' | 'marcus-aurelius' | 'confucius' | 'your-disappointed-father';

export class ConfigManager {
    private config: vscode.WorkspaceConfiguration;

    constructor() {
        this.config = vscode.workspace.getConfiguration('lintament');
    }

    getWisdomLevel(): WisdomLevel {
        return this.config.get<WisdomLevel>('wisdomLevel', 'ruthless');
    }

    getMercyMode(): boolean {
        return this.config.get<boolean>('mercyMode', false);
    }

    getQuoteSource(): QuoteSource {
        return this.config.get<QuoteSource>('quoteSource', 'sun-tzu');
    }

    getJudgmentThreshold(): number {
        return this.config.get<number>('judgmentThreshold', 0.1);
    }

    getPreserveComments(): boolean {
        return this.config.get<boolean>('preserveComments', false);
    }

    getApiKey(): string {
        return this.config.get<string>('apiKey', '');
    }

    getModel(): string {
        return this.config.get<string>('model', 'gpt-4');
    }

    updateConfig() {
        this.config = vscode.workspace.getConfiguration('lintament');
    }
}
