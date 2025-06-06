module.exports = {
    name: "help",
    usePrefix: false,
    usage: "help [command_name] (optional) | help all",
    version: "1.4",
    author:"𝙐𝙋𝘿𝘼𝙋𝙏𝙀𝘿 𝘽𝙔 Aesther", 

    execute({ api, event, args }) {
        const { threadID, messageID } = event;

        if (args.length > 0) {
            const commandName = args[0].toLowerCase();

            if (commandName === "all") {
                // Show all non-admin commands in alphabetical order
                const allCommands = Array.from(global.commands.values())
                    .filter(cmd => !cmd.admin)
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((cmd, index) => `∅ ${cmd.name} (${cmd.usePrefix ? "uses prefix" : "no prefix"})\n   Usage: ${cmd.usage} 🌸`)
                    .join("\n\n");

                const allHelpMessage = `[♦️𝗩𝗢𝗟𝗗𝗜𝗚𝗢 𝗔𝗨𝗧𝗢♦️]
    ᬊ᭄♆᭄♆Ƀ͢Ƀ𒁂⫸ཉ𒅒
    ●▬▬▬▬๑۩۩๑▬▬▬▬▬●
    ${allCommands}
    ●▬▬▬▬๑۩۩๑▬▬▬▬▬●
    🤓𝗡𝗕 : 
    Utilise 'help [nom de la cmds]' pour voir les détails de la cmd.📑`;

                return api.sendMessage(allHelpMessage, threadID, messageID);
            }

            // Show details for a specific command (including admin-only)
            const command = global.commands.get(commandName);

            if (!command) {
                return api.sendMessage(`❌ Command '${commandName}' not found.`, threadID, messageID);
            }

            const commandHelpMessage = `
📰𝗜𝗡𝗙𝗢 - 𝗖𝗠𝗗
╔═════ஜ۩۞۩ஜ═════╗
◑Name: ${command.name}
◒Usage: ${command.usage}
◔Prefix Required: ${command.usePrefix ? "✅ Yes" : "❌ No"}
◕author: ${command.author}
◑Admin Only: ${command.admin ? "✅ Yes" : "❌ No"}
◔Version: ${command.version}`;

            return api.sendMessage(commandHelpMessage, threadID, messageID);
        }

        // Show only 5 random non-admin commands
        const commandArray = Array.from(global.commands.values())
            .filter(cmd => !cmd.admin)
            .sort((a, b) => a.name.localeCompare(b.name))
            .slice(0, 5)
            .map((cmd, index) => `∅ ${cmd.name} (${cmd.usePrefix ? "uses prefix" : "no prefix"})\n   Usage: ${cmd.usage} 👾`)
            .join("\n\n");

        const helpMessage = `
[♦️𝗩𝗢𝗟𝗗𝗜𝗚𝗢 𝗔𝗨𝗧𝗢♦️]
ཉ⫸ᬊ᭄𒁂𒁂𒅒⫸᭄𒅒♆ 
●▬▬▬▬๑۩۩๑▬▬▬▬▬●
${commandArray}
●▬▬▬▬๑۩۩๑▬▬▬▬▬●
📑𝗨𝘀𝗲 'help all'
♦️𝗟𝗶𝗲𝗻 𝗱𝘂 𝗰𝗿𝗲́𝗮𝘁𝗲𝘂𝗿♦️
https://www.facebook.com/voldigo.anos`;

        api.sendMessage(helpMessage, threadID, messageID);
    }
};
