export const LanguageOptions = [
  { id: 'javascript', value: '18.15.0', label: 'JavaScript' },
  { id: 'typescript', value: '5.0.3', label: 'TypeScript' },
  { id: 'python', value: '3.10.0', label: 'Python' },
  { id: 'java', value: '15.0.2', label: 'Java' },
  { id: 'c', value: '6.12.0', label: 'C' },
  { id: 'cpp', value: '8.2.3', label: 'cpp' },
];

export const CODE_SNIPPETS: { [key: string]: string } = {
  javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
  typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
  python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
  java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
  c: `#include <stdio.h>\n\nint main() {\n\tprintf("Hello, world!\\n");\n\treturn 0;\n}`,
  cpp: `#include <iostream>\n\nint main() {\n\tstd::cout << "Hello, world!" << std::endl;\n\treturn 0;\n}`,
};
