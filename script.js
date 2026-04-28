// Navegação
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// Cadastro
function handleRegister() {
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-password').value;

    if (!name || !email || !pass) {
        alert("Preencha todos os campos do cadastro!");
        return;
    }

    // Salva no localStorage
    const user = { name, email, pass };
    localStorage.setItem(email, JSON.stringify(user));

    alert("Conta criada com sucesso! Faça seu login.");
    showScreen('login-screen');
    
    // Limpa os campos do registro
    document.getElementById('reg-name').value = "";
    document.getElementById('reg-email').value = "";
    document.getElementById('reg-password').value = "";
}

// Login
function handleLogin() {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-password').value;

    const storedUser = localStorage.getItem(email);

    if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.pass === pass) {
            // Atualiza o nome na Home
            document.getElementById('user-name-display').innerText = user.name.split(' ')[0];
            
            // REDIRECIONA PARA A TELA HOME
            showScreen('home-screen'); 
        } else {
            alert("Senha incorreta.");
        }
    } else {
        alert("Usuário não encontrado.");
    }
}

// Recuperação
function handleRecover() {
    const email = document.getElementById('recover-email').value;
    if (email) {
        alert("Instruções enviadas para " + email);
        showScreen('login-screen');
    } else {
        alert("Digite um e-mail.");
    }
}

