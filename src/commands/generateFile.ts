import * as vscode from 'vscode';
import * as fs from 'fs';
import { getConfig } from '../utils/configUtils';
import { validateConfigTemplatesDirectory } from '../utils/validation';
import { getTargetPath } from '../utils/pathUtils';
import { promptTemplateSelect } from '../utils/promptUtils';
import * as path from 'path';

export async function generateFileCommand(Uri?: vscode.Uri) {
    // Get the user's set templatesDirectory
    const templatesDirectory = (await getConfig()).templatesDirectory;
    if (!(await validateConfigTemplatesDirectory(templatesDirectory))) {
        return;
    }

    // Get the target path
    const { targetPath, createNewFolder } = await getTargetPath(Uri);
    if (!targetPath) {
        return;
    }
    console.log(targetPath, createNewFolder);

    // Prompt user to pick a template
    const templatePath = await promptTemplateSelect(templatesDirectory);
    if (!templatePath) {
        return;
    }
    const templateContent = fs.readFileSync(templatePath, 'utf8');
    const templateName = path.basename(templatePath);

    const filePath = path.join(targetPath, templateName);

    console.log(templatePath, filePath);

    if (fs.existsSync(filePath)) {
        vscode.window.showErrorMessage('File already exists', { modal: true });
        return;
    }

    fs.writeFileSync(filePath, templateContent);

    if (createNewFolder) {
        vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(targetPath), false);
        // TODO: open the file
    }
}