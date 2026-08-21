// AI portfolio agent
const agent = document.getElementById('aiAgent');
const launch = document.getElementById('agentLaunch');
const closeAgent = document.getElementById('agentClose');
const form = document.getElementById('agentForm');
const input = document.getElementById('agentInput');
const messages = document.getElementById('agentMessages');

let chatHistory = [];

function openAgent() {
  agent?.classList.add('open');
  agent?.setAttribute('aria-hidden', 'false');
  setTimeout(() => input?.focus(), 150);
}

function closeAgentFn() {
  agent?.classList.remove('open');
  agent?.setAttribute('aria-hidden', 'true');
}

launch?.addEventListener('click', openAgent);
closeAgent?.addEventListener('click', closeAgentFn);

agent?.addEventListener('click', e => {
  if (e.target === agent) {
    closeAgentFn();
  }
});

function addMessage(text, type) {
  const el = document.createElement('div');

  el.className = 'agent-message ' + type;
  el.textContent = text;

  messages.appendChild(el);
  messages.scrollTop = messages.scrollHeight;

  return el;
}

async function askAgent(text) {

  addMessage(text, 'user');

  chatHistory.push({
    role: 'user',
    content: text
  });

  const loading = addMessage('Thinking…', 'bot');

  try {

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        messages: chatHistory
      })
    });

    const data = await response.json();

    loading.remove();

    if (!response.ok) {
      throw new Error(data.error || 'Agent unavailable');
    }

    addMessage(data.reply, 'bot');

    chatHistory.push({
      role: 'assistant',
      content: data.reply
    });

  } catch (error) {

    console.error('AI Agent Error:', error);

    loading.remove();

    addMessage(
      'Sorry, the AI Agent could not respond. Please try again.',
      'bot'
    );
  }
}

form?.addEventListener('submit', e => {

  e.preventDefault();

  const text = input.value.trim();

  if (!text) return;

  input.value = '';

  askAgent(text);
});

document
  .querySelectorAll('.agent-suggestions button')
  .forEach(button => {

    button.addEventListener('click', () => {

      askAgent(button.dataset.prompt);

    });

  });
