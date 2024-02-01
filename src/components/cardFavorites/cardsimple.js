import { DivComponent } from '../../common/div-component';
import './cardsimple.css'

export class CardSimple extends DivComponent {
	constructor(appstate, state) {
		super()
		this.appstate = appstate
		this.state = state
	}

	#deleteFromFavorites() {
		this.state.favorites = this.state.favorites.filter(b => {
			return b.key !== this.appstate.key
		}) 
	}

	render() {
		this.el.classList.add('book-card')
		this.el.innerHTML = `
				<a href="#">
					<div class="place-img">
						<img class="imgposter" src="https://covers.openlibrary.org/b/olid/${this.appstate.cover_edition_key}-M.jpg" alt="book-img">
					</div>
				</a>
				<div class="book-bottom-side">
					<div class="textbook-side">
						<p class="ganr">${this.appstate.subject ? this.appstate.subject[0] : 'Не задано'}</p>
						<p class="namebook">${this.appstate.title}</p>
						<p class="authorbook">${this.appstate.author_name ? this.appstate.author_name[0] : 'Не задано'}</p>
					</div>
					<button class="btn-bookcard btn-active">
					<img src="static/img/fav-book-active.svg" alt="fav-book"></img>
					</button>
				</div>
		`
		this.el.querySelector('button').addEventListener('click', this.#deleteFromFavorites.bind(this))
		return this.el
	}
}