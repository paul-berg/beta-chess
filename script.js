        /**
         * Реализовать
         * 1. Ходы пешек
         * 2. Ходы короля
         * 3. Очередность хода
         * 4. Возможность бить фигуры противника по правилам
         */

         let figure
         let startX
         let startY
         let currentTurn = ['white', 'black']
         document.querySelectorAll('.figure').forEach(item => {
             if (item.dataset.type === 'pawn') {
                 item.classList.add('firstTurn')
             }
             item.addEventListener('dragstart', e => {
                 figure = item
                 const parent = item.closest('td')
                 startX = +parent.dataset.x
                 startY = +parent.dataset.y
             })
         })
         document.querySelectorAll('td').forEach(td => {
             td.addEventListener('dragover', e => e.preventDefault())
             td.addEventListener('drop', e => {
                 if (figure.dataset.color !== currentTurn[0] || (e.target.lastElementChild && figure.dataset.color === e.target.lastElementChild.dataset.color && e.target.lastElementChild.hidden !== true)|| (e.target.lastElementChild && e.target.lastElementChild.dataset.type === 'king') ) {
                    return
                 }
                 const endX = e.target.dataset.x
                 const endY = e.target.dataset.y
                 switch (figure.dataset.type) {
                     case 'king':
                         const deltaX = Math.abs(endX - startX)
                         const deltaY = Math.abs(endY - startY)
                         if (deltaX <= 1 && deltaY <= 1 && (deltaX + deltaY !== 0)) {
                             if (e.target.firstElementChild && figure.dataset.type !== e.target.firstElementChild.dataset.type) {
                                 e.target.lastElementChild.hidden = true;
                                 e.target.append(figure)
                             currentTurn.reverse()
                             } else {
                                e.target.append(figure)
                                currentTurn.reverse()
                             }
                             
                         }
                         break;
                     case 'pawn':
                         const deltaPawnAbsX = Math.abs(endX - startX)
                         const deltaPawnX = endX - startX
                         const deltaPawnY = endY - startY
 
                         if ((deltaPawnAbsX === 0) && (figure.classList.contains('firstTurn')) && ((deltaPawnY <= 2 && figure.dataset.color === 'white' && deltaPawnY > 0) || (deltaPawnY >= -2 && figure.dataset.color === 'black' && deltaPawnY < 0))) {
                             figure.classList.remove('firstTurn');
                             e.target.append(figure)
                             currentTurn.reverse()
                         }
                         else if ((deltaPawnAbsX === 0) && (!figure.classList.contains('firstTurn')) && ((deltaPawnY <= 1 && figure.dataset.color === 'white' && deltaPawnY > 0) || (deltaPawnY >= -1 && figure.dataset.color === 'black' && deltaPawnY < 0))) {
                             e.target.append(figure)
                             currentTurn.reverse()
                         }
                         else if (((deltaPawnX === 1) || (deltaPawnX === -1)) && ((deltaPawnY === 1 && figure.dataset.color === 'white') || (deltaPawnY === -1 && figure.dataset.color === 'black'))) {
                             e.target.lastElementChild.hidden = true;
                             e.target.append(figure)
                             currentTurn.reverse()
                         }
                 }
             })
         })