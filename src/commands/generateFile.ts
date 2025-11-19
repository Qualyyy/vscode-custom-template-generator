import * as vscode from 'vscode';
import { getConfig } from '../utils/configUtils';
export async function generateFileCommand(Uri?: vscode.Uri) {
    console.log('Hello world!');

    const templatesDirectory = (await getConfig()).templatesDirectory;
}