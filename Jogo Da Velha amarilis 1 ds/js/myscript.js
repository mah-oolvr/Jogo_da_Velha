
document.addEventListener('DOMContentLoaded', function() {

    const celulas = document.querySelectorAll('[data-celula]');
    const status = document.querySelector('.status');
    const resetBtn = document.getElementById('reset-button');

    let jogadorAtual = 'X';
    let jogoAtivo = true;

    let tabuleiro = ['', '', '', '', '', '', '', '', ''];

    const possibilidades = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function clica(event) {

        const celula = event.target;
        const indice = Array.from(celulas).indexOf(celula);

        if (tabuleiro[indice] !== '' || !jogoAtivo) {
            return;
        }

        tabuleiro[indice] = jogadorAtual;
        celula.textContent = jogadorAtual;

        if (verifica(jogadorAtual)) {

            jogoAtivo = false;
            status.textContent = `O jogador ${jogadorAtual} venceu!`;

        } else if (tabuleiro.includes('')) {

            jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
            status.textContent = `É a vez do jogador ${jogadorAtual}`;

        } else {

            jogoAtivo = false;
            status.textContent = 'Empate!';

        }
    }

    function verifica(jogador) {

        for (const jogadas of possibilidades) {

            if (
                tabuleiro[jogadas[0]] === jogador &&
                tabuleiro[jogadas[1]] === jogador &&
                tabuleiro[jogadas[2]] === jogador
            ) {
                return true;
            }
        }

        return false;
    }

    function resetJogo() {

        tabuleiro = ['', '', '', '', '', '', '', '', ''];

        jogoAtivo = true;
        jogadorAtual = 'X';

        celulas.forEach((celula) => {
            celula.textContent = '';
        });

        status.textContent = 'É a vez do jogador X';
    }

    celulas.forEach((celula) => {
        celula.addEventListener('click', clica);
    });

    resetBtn.addEventListener('click', resetJogo);

});
