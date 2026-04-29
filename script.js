// ============================================
// SPA - Single Page Application
// ============================================

// Router SPA
const AppRouter = {
    routes: {
        '': 'login-screen',
        'login': 'login-screen',
        'register': 'register-screen',
        'recover': 'recover-screen',
        'home': 'home-screen',
        'settings': 'settings-screen'
    },
    
    currentRoute: '',
    
    // Inicializar o router
    init() {
        // Configurar navegação via hash
        window.addEventListener('hashchange', () => this.handleRoute());
        
        // Primeira carga
        this.handleRoute();
    },
    
    // Navegar para uma rota
    navigate(route) {
        window.location.hash = route;
    },
    
    // Tratar mudança de rota
    handleRoute() {
        let hash = window.location.hash.slice(1) || '';
        
        // Se não tiver hash, redirecionar para login
        if (!hash) {
            hash = 'login';
        }
        
        const screenId = this.routes[hash];
        
        if (screenId) {
            this.showScreen(screenId);
            this.currentRoute = hash;
        } else {
            // Rota não encontrada, ir para login
            this.navigate('login');
        }
    },
    
    // Mostrar tela específica
    showScreen(screenId) {
        // Remove active de todas as telas
        const screens = document.querySelectorAll('.screen');
        screens.forEach(s => s.classList.remove('active'));
        
        // Adiciona active na tela selecionada
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }
    }
};

// Função global para navegação (compatível com onclick)
function showScreen(id) {
    // Converter ID para rota
    const routeMap = {
        'login-screen': 'login',
        'register-screen': 'register',
        'recover-screen': 'recover',
        'home-screen': 'home',
        'settings-screen': 'settings'
    };
    
    const route = routeMap[id];
    if (route) {
        AppRouter.navigate(route);
    } else {
        AppRouter.showScreen(id);
    }
}

// ============================================
// Funções de Negócio
// ============================================

// Cadastro de usuário
function handleRegister() {
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-password').value;

    if (!name || !email || !pass) {
        alert("Preencha todos os campos do cadastro!");
        return;
    }

    // Salva no localStorage
    const user = { name: name, email: email, pass: pass };
    localStorage.setItem('oportuniza_user_' + email, JSON.stringify(user));

    alert("Conta criada com sucesso! Faça seu login.");
    showScreen('register-screen');
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

    if (!email || !pass) {
        alert("Preencha e-mail e senha!");
        return;
    }

    const storedUser = localStorage.getItem('oportuniza_user_' + email);

    if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.pass === pass) {
            // Atualiza o nome na Home
            document.getElementById('user-name-display').innerText = user.name.split(' ')[0];
            
            // Salva sessão
            localStorage.setItem('oportuniza_session', email);
            
            // REDIRECIONA PARA A TELA HOME
            showScreen('login-screen');
            showScreen('home-screen'); 
        } else {
            alert("Senha incorreta.");
        }
    } else {
        alert("Usuário não encontrado.");
    }
}

// Recuperação de senha
function handleRecover() {
    const email = document.getElementById('recover-email').value;
    if (email) {
        alert("Instruções enviadas para " + email);
        showScreen('recover-screen');
        showScreen('login-screen');
    } else {
        alert("Digite um e-mail.");
    }
}

// Sair da conta - Volta para tela inicial
function handleLogout() {
    if (confirm("Deseja realmente sair da conta?")) {
        // Limpa sessão
        localStorage.removeItem('oportuniza_session');
        
        // Limpa os campos de login
        document.getElementById('login-email').value = "";
        document.getElementById('login-password').value = "";
        
        // Volta para a tela de login
        showScreen('settings-screen');
        showScreen('login-screen');
    }
}

// Verificar sessão ao iniciar
function checkSession() {
    const session = localStorage.getItem('oportuniza_session');
    if (session) {
        const user = JSON.parse(localStorage.getItem('oportuniza_user_' + session));
        if (user) {
            document.getElementById('user-name-display').innerText = user.name.split(' ')[0];
        }
    }
}

// ============================================
// Inicialização
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 SPA Oportuniza carregada!');
    
    // Inicializar router
    AppRouter.init();
    
    // Verificar sessão
    checkSession();
});

// ============================================
// Sidebar - Menu Lateral
// ============================================

// Alternar sidebar
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}

// Navegar e fechar sidebar
function navigateAndClose(route) {
    // Fechar sidebar
    toggleSidebar();
    
    // Navegar para a rota
    AppRouter.navigate(route);
}

