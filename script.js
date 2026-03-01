document.getElementById('startBtn').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const statusDiv = document.getElementById('status');
    const btn = document.getElementById('startBtn');
    
    if (!email || !password) {
        showStatus('Введите email и пароль', 'error');
        return;
    }
    
    btn.disabled = true;
    showStatus('Идет подключение к iCloud...', 'info');
    
    try {
        // Эмуляция API iCloud (реальное API требует сложной аутентификации)
        // В реальном проекте здесь будет вызов бэкенд функции через Vercel
        const response = await fetch('/api/clean-icloud', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showStatus(`Успешно! Удалено устройств: ${data.removed}`, 'success');
        } else {
            showStatus('Ошибка: ' + data.error, 'error');
        }
    } catch (error) {
        showStatus('Ошибка подключения: ' + error.message, 'error');
    } finally {
        btn.disabled = false;
    }
});

function showStatus(message, type) {
    const statusDiv = document.getElementById('status');
    statusDiv.className = 'status ' + type;
    statusDiv.textContent = message;
}
