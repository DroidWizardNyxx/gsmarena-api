const playwright = require('playwright');

// Criamos uma única instância do navegador para ser reutilizada.
// Isso melhora drasticamente a performance.
let browser;
let context;

async function initializeBrowser() {
    if (!browser) {
        browser = await playwright.chromium.launch();
        context = await browser.newContext({
            // Simula um navegador comum para evitar ser detectado como bot
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        });
    }
}

exports.getDataFromUrl = async (url) => {
    await initializeBrowser(); // Garante que o navegador está rodando
    const page = await context.newPage();

    try {
        await page.goto(`https://www.gsmarena.com${url}`, { waitUntil: 'domcontentloaded' });
        const html = await page.content();
        return html;
    } finally {
        // Fechamos a página para liberar memória, mas mantemos o navegador aberto.
        await page.close();
    }
};

exports.getPrice = (text) => {
    const value = text.replace(',', '').split(' ');
    return {
        currency: value[0],
        price: parseFloat(value[1]),
    };
};

// Função para fechar o navegador quando a aplicação for encerrada
exports.closeBrowser = async () => {
    if (browser) {
        await browser.close();
    }
};