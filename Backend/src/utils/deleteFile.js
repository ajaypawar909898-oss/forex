import fs from "fs";
import path from "path";

export const deleteFile = (filePath) => {
    try {
        if (!filePath) return;

        // extract filename only
        const fileName = path.basename(filePath);

        const folders = ["Documents", "Wallet", "bank"];

        for (const folder of folders) {
            const fullPath = path.join(
                process.cwd(),
                "uploads",
                folder,
                fileName
            );

            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
                console.log("Deleted:", fullPath);
                return;
            }
        }

    } catch (err) {
        console.error("File delete error:", err.message);
    }
};