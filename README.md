# 大模型开发课程作业

## 作业完成情况

1. 在 Apple M1 Pro、16GB 统一内存的 Mac 上安装 Ollama，下载并运行本地模型 `qwen3:4b`。
2. 使用 JavaScript 和 LangChain 的 `ChatOllama` 调用本地模型，支持从命令行传入问题。
3. 在 VS Code 安装官方扩展 `ollama.ollama`，选择 `qwen3:4b`，在 Ask 模式下完成代码解释问答。
4. 扩展实践：实现查询课程作业的 Agent，模型提出工具调用，JS 读取作业文件，再把结果返回模型生成回答。

本次使用的是已有模型的本地推理，没有进行模型训练或微调。

## 环境与运行

- 硬件：Apple M1 Pro，16GB 统一内存。
- Ollama：0.40.16；模型：qwen3:4b。
- 代码：JavaScript（ES Modules），需 Node.js 20 或更新版本。
- 依赖版本由 `本地模型作业/package-lock.json` 锁定。
- 本地服务地址：http://127.0.0.1:11434。

先安装、打开 Ollama，并执行：

```sh
ollama pull qwen3:4b
```

在解压后的“作业提交”目录运行：

```sh
cd 本地模型作业
npm ci
npm run chat
npm run chat -- "用一个简单例子解释 Promise.all 和 Promise.allSettled 的区别"
npm run agent
```

运行 Agent 时，请保留目录结构：代码从上一级的 `作业.md` 读取原始要求。

## 代码说明

- `chat.js`：创建 ChatOllama 客户端，通过 invoke 发送 system/human 消息并打印回答。上下文窗口设置为 4096。
- `agent.js`：使用 bindTools 提供工具说明，检查 tool_calls 后执行固定文件读取，通过 ToolMessage 和调用 ID 返回结果，最多三轮。
- `作业.md`：老师布置的原始作业要求。

## 运行结果

截图来自实际操作：

- `运行截图/01-LangChain调用本地模型.png`：命令行传入问题，本地模型生成回答。
- `运行截图/02-Agent工具调用.png`：出现 get_homework 调用、文件读取结果和模型最终回答。
- `运行截图/03-VSCode使用Ollama模型.png`：VS Code Ask 模式解释代码，回复底部显示 Ollama/qwen3:4b。

## 实践理解与观察

Ollama 负责加载和运行模型，LangChain 负责在代码中组织模型调用。模型提出工具调用后，由 JavaScript 执行真实的文件读取；模型本身没有直接读取文件。

VS Code Agent 模式下曾出现明显发热；改用 Ask 完成简单问答后未再观察到明显发烫。运行状态检查曾记录上下文窗口及缓存占用增加，但没有进行严格性能基准测试。

当前模型仍可能在输出正文中夹带思考文字；工具流程已通过日志和实际文件读取验证。模型生成的技术内容仍需要人工核对。

源码包不包含模型权重和 node_modules，安装依赖及下载模型后可运行。
