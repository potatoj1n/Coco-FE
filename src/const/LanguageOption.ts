export const LanguageOptions = [
  { id: 'javascript', value: '18.15.0', label: 'JavaScript' },
  { id: 'typescript', value: '5.0.3', label: 'TypeScript' },
  { id: 'python', value: '3.10.0', label: 'Python' },
  { id: 'java', value: '15.0.2', label: 'Java' },
  { id: 'csharp', value: '6.12.0', label: 'C#' },
  { id: 'php', value: '8.2.3', label: 'PHP' },
];

export const CODE_SNIPPETS: { [key: string]: string } = {
  javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
  typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
  python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
  java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
  csharp:
    'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
  php: "<?php\n\n$name = 'Alex';\necho $name;\n",
};
