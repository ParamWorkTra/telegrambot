const TelegramBot = require('node-telegram-bot-api');


const token = '7494003683:AAFkpzUClXbWU03oQRb8qg86DUBquRrt5js';

const bot = new TelegramBot(token, { polling: true });

    bot.onText(/\/start/, async  (msg) => {
          const messageText = "Hi! Send me any file, and I will convert it to a direct download link.\n 😉"
       await bot.sendMessage(msg.chat.id, messageText );
        // const telegram =  `[Param](https://t.me/parampanchal)`;
        await bot.sendMessage(msg.chat.id, `Made with ❤ by  [Param](https://t.me/parampanchal)`,{ parse_mode: 'Markdown', disable_web_page_preview: true })

    });
    bot.on('document', async (msg) => {
        try {
            const fileId = msg.document.file_id;
            const fileName = msg.document.file_name;
            const fileUrl = await getFileUrl(fileId);
    
            const messageText = `File Name: ${fileName}\nDownload URL: ${fileUrl}`;
            await bot.sendMessage(msg.chat.id, messageText);
        } catch (error) {
            await bot.sendMessage(msg.chat.id, `Error handling file: ${error.message}`);
        }
    });
    
    bot.on('photo', async (msg) => {
        try {
            // Photo messages contain an array of photo sizes, we typically use the last one (highest resolution)
            const photo = msg.photo[msg.photo.length - 1];
            const fileId = photo.file_id;
            const fileUrl = await getFileUrl(fileId);
    
            const messageText = `File Name: photo.jpg\nDownload URL: ${fileUrl}`; // You can customize the file name if needed
            await bot.sendMessage(msg.chat.id, messageText);
        } catch (error) {
            await bot.sendMessage(msg.chat.id, `Error handling photo: ${error.message}`);
        }
    });
    
    bot.on('audio', async (msg) => {
        try {
            const fileId = msg.audio.file_id;
            const fileName = `${msg.audio.performer} - ${msg.audio.title}.mp3`;
            const fileUrl = await getFileUrl(fileId);
    
            const messageText = `File Name: ${fileName}\nDownload URL: ${fileUrl}`;
            await bot.sendMessage(msg.chat.id, messageText);
        } catch (error) {
            await bot.sendMessage(msg.chat.id, `Error handling audio: ${error.message}`);
        }
    });
    
    bot.on('video', async (msg) => {
        try {
            const fileId = msg.video.file_id;
            const fileName = `${msg.video.file_name}.mp4`;
            const fileUrl = await getFileUrl(fileId);
    
            const messageText = `File Name: ${fileName}\nDownload URL: ${fileUrl}`;
            await bot.sendMessage(msg.chat.id, messageText);
        } catch (error) {
            await bot.sendMessage(msg.chat.id, `Error handling video: ${error.message}`);
        }
    });
    
    bot.on('voice', async (msg) => {
        try {
            const fileId = msg.voice.file_id;
            const fileName = `voice_message_${Date.now()}.ogg`; // You can customize the file name if needed
            const fileUrl = await getFileUrl(fileId);
    
            const messageText = `File Name: ${fileName}\nDownload URL: ${fileUrl}`;
            await bot.sendMessage(msg.chat.id, messageText);
        } catch (error) {
            await bot.sendMessage(msg.chat.id, `Error handling voice message: ${error.message}`);
        }
    });
    
    bot.on('animation', async (msg) => {
        try {
            const fileId = msg.animation.file_id;
            const fileName = `${msg.animation.file_name}.gif`;
            const fileUrl = await getFileUrl(fileId);
    
            const messageText = `File Name: ${fileName}\nDownload URL: ${fileUrl}`;
            await bot.sendMessage(msg.chat.id, messageText);
        } catch (error) {
            await bot.sendMessage(msg.chat.id, `Error handling animation: ${error.message}`);
        }
    });
    
    // Helper function to retrieve file URL using file_id
    async function getFileUrl(fileId) {
        const file = await bot.getFile(fileId);
        return `https://api.telegram.org/file/bot${token}/${file.file_path}`;
    }
    
    bot.on('message', (msg) => {
        // Handle messages that are not file uploads
        if (!msg.document && !msg.photo && !msg.audio && !msg.video && !msg.voice && !msg.animation) {
            bot.sendMessage(msg.chat.id, "Please upload a file to get a download link.");
        }
    });
    
    console.log("BOT started");