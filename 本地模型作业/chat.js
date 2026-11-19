// 第一步：导入 LangChain 对 Ollama 的封装。
import { ChatOllama } from '@langchain/ollama';

// 第二步：连接本机 Ollama，指定已经下载的模型。
// 创建对象并不等于下载或训练模型。
const model = new ChatOllama({
  baseUrl: 'http://127.0.0.1:11434',
  model: process.env.OLLAMA_MODEL || 'qwen3:4b',
  temperature: 0,
  numCtx: 4096,
  maxRetries: 0,
});

// 第三步：命令行参数作为问题。不传参数时使用默认问题。
const question =
  process.argv.slice(2).join(' ') ||
  '请用一个 JavaScript 开发者能理解的例子解释：Ollama 和 LangChain 分别负责什么？';

try {
  // system 定义回答要求，human 放用户的问题。
  const answer = await model.invoke([
    [
      'system',
      '你是耐心的编程老师。用中文简洁回答，先解释概念，再举一个具体例子。',
    ],
    ['human', question],
  ]);
  console.log(answer.content);
} catch (error) {
  console.error('调用失败：', error.message);
  console.error(
    '请确认 Ollama 已启动，并已运行 ollama pull qwen3:4b。也可运行 ollama list 检查模型。',
  );
  process.exitCode = 1;
}
