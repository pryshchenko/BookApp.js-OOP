import { AbstractView } from '../../common/view.js';
import { CardFavorites } from '../../components/cardFavorites/cardFavorites.js';
import { Header } from '../../components/header/header.js';
import onChange from 'on-change';

export class Favorites extends AbstractView {
	constructor(appstate) {
		super()
		this.setTitle('Избранные книги')
		this.appstate = appstate
		this.appstate = onChange(this.appstate, this.appStateHook.bind(this))
	}

	destroy() {
		onChange.unsubscribe(this.appstate)
	}

	render() {
		this.app.innerHTML = ''
		this.renderHeader()
		this.renderCard()
	}

	renderHeader() {
		const header = new Header(this.appstate).render()
		this.app.prepend(header)
	}

	renderCard() {
		const cards = new CardFavorites(this.appstate).render()
		this.app.append(cards)
	}

	appStateHook(path) {
		if (path === 'favorites') {
			this.render()
		}
	}
}