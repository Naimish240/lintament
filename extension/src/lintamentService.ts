import { ConfigManager, WisdomLevel } from './config';
import { WisdomQuotes } from './wisdom';

export interface AnalysisResult {
    shouldReplace: boolean;
    issues: string[];
    fixedCode?: string;
    score: number; // 0-1, lower = worse code
}

export class LintamentService {
    private configManager: ConfigManager;
    private hasApiKey: boolean;

    constructor(configManager: ConfigManager) {
        this.configManager = configManager;
        this.hasApiKey = !!this.configManager.getApiKey();
    }

    async analyzeAndFix(code: string, filename: string): Promise<AnalysisResult> {
        // Update config in case it changed
        this.configManager.updateConfig();

        if (this.hasApiKey) {
            return await this.analyzeWithLLM(code, filename);
        } else {
            return await this.analyzeWithHeuristics(code, filename);
        }
    }

    private async analyzeWithLLM(code: string, filename: string): Promise<AnalysisResult> {
        try {
            // Dynamic import to avoid issues if OpenAI package is not available
            const { default: OpenAI } = await import('openai');
            const openai = new OpenAI({
                apiKey: this.configManager.getApiKey()
            });

            const wisdomLevel = this.configManager.getWisdomLevel();
            const mercyMode = this.configManager.getMercyMode();
            const threshold = this.configManager.getJudgmentThreshold();

            const prompt = this.buildAnalysisPrompt(code, filename, wisdomLevel, mercyMode);

            const response = await openai.chat.completions.create({
                model: this.configManager.getModel(),
                messages: [
                    {
                        role: 'system',
                        content: 'You are Lintament, an AI code analyzer that judges code quality with ancient wisdom. Analyze code and provide fixes or replacements.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: mercyMode ? 0.7 : 0.3,
                max_tokens: 2000
            });

            const content = response.choices[0]?.message?.content || '';
            return this.parseLLMResponse(content, code, threshold);
        } catch (error: any) {
            console.error('LLM analysis failed:', error);
            // Fallback to heuristics
            return await this.analyzeWithHeuristics(code, filename);
        }
    }

    private buildAnalysisPrompt(code: string, filename: string, wisdomLevel: WisdomLevel, mercyMode: boolean): string {
        const tone = mercyMode ? 'passive-aggressive' : 'direct and harsh';
        const level = wisdomLevel === 'ruthless' ? 'extremely critical' : wisdomLevel;

        return `Analyze this code and provide a JSON response with:
{
  "score": 0.0-1.0 (lower = worse code),
  "issues": ["issue1", "issue2", ...],
  "shouldReplace": true/false,
  "fixedCode": "improved code or null"
}

Code to analyze:
\`\`\`
${code}
\`\`\`

Filename: ${filename}
Be ${level} in your judgment. Tone: ${tone}.
If code quality score is below 0.3, consider replacing with a wisdom quote or significantly improved version.`;
    }

    private parseLLMResponse(content: string, originalCode: string, threshold: number): AnalysisResult {
        try {
            // Try to extract JSON from response
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                return {
                    shouldReplace: parsed.shouldReplace || parsed.score < threshold,
                    issues: parsed.issues || [],
                    fixedCode: parsed.fixedCode,
                    score: parsed.score || 0.5
                };
            }
        } catch (error) {
            console.error('Failed to parse LLM response:', error);
        }

        // Fallback: if response mentions issues, flag it
        const hasIssues = content.toLowerCase().includes('issue') || 
                         content.toLowerCase().includes('problem') ||
                         content.toLowerCase().includes('bad');
        
        return {
            shouldReplace: hasIssues,
            issues: ['Code quality issues detected by LLM'],
            fixedCode: undefined,
            score: hasIssues ? 0.3 : 0.7
        };
    }

    private async analyzeWithHeuristics(code: string, filename: string): Promise<AnalysisResult> {
        const issues: string[] = [];
        let complexityScore = 0;
        let badPatterns = 0;

        // Check for nested if statements (complexity)
        const nestedIfMatches = code.match(/if\s*\([^)]*\)\s*\{[^}]*if\s*\(/g);
        if (nestedIfMatches) {
            issues.push(`Nested conditionals detected (${nestedIfMatches.length} instances). Cognitive complexity exceeds mortal comprehension.`);
            badPatterns += nestedIfMatches.length;
        }

        // Check for var instead of let/const
        const varMatches = code.match(/\bvar\s+\w+/g);
        if (varMatches) {
            issues.push(`Using 'var' instead of 'let' or 'const' (${varMatches.length} instances). This is not 2015.`);
            badPatterns += varMatches.length;
        }

        // Check for TODO comments
        const todoMatches = code.match(/\/\/\s*TODO:?/gi);
        if (todoMatches && !this.configManager.getPreserveComments()) {
            issues.push(`TODO comments found (${todoMatches.length} instances). "Later" never comes.`);
            badPatterns += todoMatches.length;
        }

        // Check for deep nesting
        const maxIndent = Math.max(...code.split('\n').map(line => {
            const match = line.match(/^(\s*)/);
            return match ? match[1].length : 0;
        }));
        if (maxIndent > 20) {
            issues.push(`Excessive indentation detected (${maxIndent} spaces). Your code is a Russian nesting doll of bad decisions.`);
            badPatterns += 2;
        }

        // Check for long functions (rough estimate)
        const functionMatches = code.match(/function\s+\w+\s*\([^)]*\)\s*\{/g);
        if (functionMatches) {
            functionMatches.forEach(() => {
                // Rough check: if function is more than 50 lines
                const functionBody = code.split(/function\s+\w+\s*\([^)]*\)\s*\{/)[1];
                if (functionBody && functionBody.split('\n').length > 50) {
                    issues.push('Function exceeds reasonable length. Consider breaking it down.');
                    badPatterns += 1;
                }
            });
        }

        // Calculate score (lower = worse)
        complexityScore = Math.max(0, 1 - (badPatterns * 0.15));
        const shouldReplace = complexityScore < this.configManager.getJudgmentThreshold();

        // Generate fixed code if needed
        let fixedCode: string | undefined;
        if (shouldReplace) {
            const wisdom = WisdomQuotes.getQuote(this.configManager.getQuoteSource());
            const mercyMode = this.configManager.getMercyMode();
            
            if (mercyMode) {
                // In mercy mode, try to improve the code slightly
                fixedCode = this.generateMercyFix(code, wisdom);
            } else {
                // Ruthless mode: replace with wisdom
                fixedCode = wisdom + '\n\n// Original code removed for your own protection.';
            }
        }

        return {
            shouldReplace,
            issues,
            fixedCode,
            score: complexityScore
        };
    }

    private generateMercyFix(code: string, wisdom: string): string {
        // Try to preserve some structure while adding wisdom
        return `${wisdom}\n\n// Your code had issues, but we're trying to be nice.\n// Here's a slightly improved version:\n\n${code}`;
    }
}
