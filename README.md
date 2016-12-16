# WARgar.io
WARgar.io é um jogo multiplayer online em real time, implementado com a tecnologia de sockets provida pelo Socket.IO, além dessa tecnologia utilizamos Node.JS, ExpressJS, HTML5 e Heroku.
Esse jogo foi desenvolvido para a disciplina Sistemas Distribuidos do professor [Francisco Isidro Masseto](https://github.com/fmassetto) da [UFABC](http://ufabc.edu.br).

## Problemas resolvidos
O nosso problema foi resolvido em duas partes

1. Chat
2. Game

No chat utilizamos o total de 3 sockets, um para a entrada do usuário que emite uma mensagem de boas vindas para todos os clientes, outro para a emissão de mensagens recebidas no servidor por parte de cada cliente e um ultimo socket que detecta se o usuário fez o logout e emite um aviso para os usuários que ainda estão online que o usuário saiu.

No game também utilizamos 3 sockets, o primeiro recebe os dados de nome e cores do usuário para criar o player no canvas, o segundo faz a detecção de mudança de estado no player a partir da interação com o teclado e um último que detecta se o player saiu do jogo e remove ele do canvas.

Nos dois casos dois sockets são compartilhados: o de entrada e o de saída. O de entrada recebe o nome, cor de preenchimento e cor de borda que o player deseja, com isso ele envia todos os dados para desenhar o player no canvas e, além disso, envia o nome e a cor de preenchimento para o chat. Na saída é detectado se o socket foi desconectado e então é removido o player da lista de posições no canvas e, também, é enviado um broadcast para o chat que avisa a todos os clientes que o player foi desconectado.

## Dificuldades enfrentadas
Nossa maior dificuldade foi não ter conseguido implementar a tecnologia de Rooms/Namespaces para dividir os usuários em salas específicas para o jogo. Como não foi possível, implementamos apenas uma sala principal com um chat.
