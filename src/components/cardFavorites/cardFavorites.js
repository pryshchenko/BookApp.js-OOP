import { DivComponent } from '../../common/div-component';
import { CardSimple } from './cardsimple';
import './cardFavorites.css'

export class CardFavorites extends DivComponent {
	constructor(appstate) {
		super()
		this.appstate = appstate
	}

	render() {
		this.el.classList.add('result-book-list')
		this.el.innerHTML = `<h2 class="result-book-list">Избранные книги - ${this.appstate.favorites.length}</h2>`
		this.bookRes = document.createElement('div')
		this.bookRes.classList.add('book-result')
		this.el.append(this.bookRes)
		for (const card of this.appstate.favorites) {
			this.bookRes.append(new CardSimple(card, this.appstate).render())
		}
		
		return this.el
	}
}