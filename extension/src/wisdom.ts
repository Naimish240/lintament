import { QuoteSource } from './config';

export class WisdomQuotes {
    private static quotes: Record<QuoteSource, string[]> = {
        'sun-tzu': [
            '/* "The supreme art of war is to subdue the enemy without fighting." - Sun Tzu, The Art of War */',
            '/* "In the midst of chaos, there is also opportunity." - Sun Tzu */',
            '/* "Victory belongs to those who are willing to pay the price." - Sun Tzu */',
            '/* "The greatest victory is that which requires no battle." - Sun Tzu */',
            '/* "Know yourself and know your enemy, and you can fight a hundred battles without disaster." - Sun Tzu */'
        ],
        'marcus-aurelius': [
            '/* "You have power over your mind - not outside events. Realize this, and you will find strength." - Marcus Aurelius */',
            '/* "The impediment to action advances action. What stands in the way becomes the way." - Marcus Aurelius */',
            '/* "Waste no more time arguing what a good man should be. Be one." - Marcus Aurelius */',
            '/* "The best revenge is not to be like your enemy." - Marcus Aurelius */',
            '/* "Very little is needed to make a happy life; it is all within yourself, in your way of thinking." - Marcus Aurelius */'
        ],
        'confucius': [
            '/* "It does not matter how slowly you go as long as you do not stop." - Confucius */',
            '/* "Our greatest glory is not in never falling, but in rising every time we fall." - Confucius */',
            '/* "The man who asks a question is a fool for a minute, the man who does not is a fool for life." - Confucius */',
            '/* "Real knowledge is to know the extent of one\'s ignorance." - Confucius */',
            '/* "When it is obvious that the goals cannot be reached, don\'t adjust the goals, adjust the action steps." - Confucius */'
        ],
        'your-disappointed-father': [
            '/* "I\'m not angry, I\'m just disappointed." - Your Disappointed Father */',
            '/* "We need to talk about your code quality." - Your Disappointed Father */',
            '/* "Is this really the best you can do?" - Your Disappointed Father */',
            '/* "I expected more from you." - Your Disappointed Father */',
            '/* "Back in my day, we wrote code that worked." - Your Disappointed Father */'
        ]
    };

    static getQuote(source: QuoteSource): string {
        const quotes = this.quotes[source];
        return quotes[Math.floor(Math.random() * quotes.length)];
    }

    static getAllQuotes(source: QuoteSource): string[] {
        return this.quotes[source];
    }
}
