// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ServerListener } from './server-listener';
import { showHelloText, commentLine } from './tester';
import { ProjectChecker } from './project-checker';
import { FileWatcher } from './file-watcher';
import { Prefixer } from './prefixer';
import { StyleCompiler } from './style-compiler';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	try {
		const prefixer = new Prefixer();
		const serverListener = new ServerListener();
		const projectChecker = new ProjectChecker();
		const styleCompiler = new StyleCompiler();
		const fileWatcher = new FileWatcher(serverListener, projectChecker, prefixer, styleCompiler);
		try {
			fileWatcher.trackingUserInput();
			projectChecker.isAngular();
			context.subscriptions.push(fileWatcher.tracker());
		} catch (error) {
			console.error('error on track', error);
		}
	} catch (error) {
		console.error('error on declare', error);
	}
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension SnapCss is now active!');

	// context.subscriptions.push(showHelloText());
	// context.subscriptions.push(commentLine());
	// context.subscriptions.push(fileWatcher.sendCode());
	// context.subscriptions.push(projectChecker.getInfo());
}

// this method is called when your extension is deactivated
export function deactivate() { }
