import { DivComponent } from '../../common/div-component';
import './card.css'

export class Card extends DivComponent {
	constructor(appstate, cardstate) {
		super()
		this.cardstate = cardstate
		this.appstate = appstate
	}

	#addToFavorites() {
		this.appstate.favorites.push(this.cardstate)
	}

	#deleteFromFavorites() {
		this.appstate.favorites = this.appstate.favorites.filter(b => b.key !== this.cardstate.key)
	}

	render() {
		this.el.classList.add('book-card')
		const existInFavorites = this.appstate.favorites.find(b => b.key === this.cardstate.key)
		this.el.innerHTML = `
				<a href="#">
					<div class="place-img">
						<img class="imgposter" src="https://covers.openlibrary.org/b/olid/${this.cardstate.cover_edition_key}-M.jpg" alt="book-img">
					</div>
				</a>
				<div class="book-bottom-side">
					<div class="textbook-side">
						<p class="ganr">${this.cardstate.subject ? this.cardstate.subject[0] : 'Не задано'}</p>
						<p class="namebook">${this.cardstate.title}</p>
						<p class="authorbook">${this.cardstate.author_name ? this.cardstate.author_name[0] : 'Не задано'}</p>
					</div>
					<button class="btn-bookcard ${existInFavorites ? 'btn-active' : ''}">
						${existInFavorites 
						? '<img src="static/img/fav-book-active.svg" alt="fav-book"></img>'
						: '<img src="static/img/fav-book.svg" alt="fav-book"></img>'
						} 
					</button>
				</div>
		`
		if (existInFavorites) {
			this.el.querySelector('button').addEventListener('click', this.#deleteFromFavorites.bind(this))
		} else {
			this.el.querySelector('button').addEventListener('click', this.#addToFavorites.bind(this))
		}
		return this.el
	}
}