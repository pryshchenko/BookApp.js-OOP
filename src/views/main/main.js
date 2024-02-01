import { AbstractView } from '../../common/view.js';
import { CardList } from '../../components/cardList/cardList.js';
import { Header } from '../../components/header/header.js';
import { Search } from '../../components/search/search.js';
import onChange from 'on-change';

export class MainView extends AbstractView {
	state = {
		list: [],
		numFound: 0,	
		loading: false,
		searchQuery: undefined,
		offset: 0
	}
	
	constructor(appstate) {
		super()
		this.appstate = onChange(appstate, this.appStateHook.bind(this))
		this.state = onChange(this.state, this.stateHook.bind(this))
		this.setTitle('Поиск книг')
	}

	destroy() {
		onChange.unsubscribe(this.appstate)
		onChange.unsubscribe(this.state)
	}

	appStateHook(path) {
		if (path === 'favorites') {
			this.render()
		}
	}

	async stateHook(path) {
		if (path === 'searchQuery' || path === 'offset') {
			this.state.loading = true
			const data = await this.loadList(this.state.searchQuery, this.state.offset)
			this.state.loading = false
			this.state.numFound = data.numFound
			this.state.list = data.docs
		}
		if (path === 'list' || path === 'loading') {
			this.render()
		}
	}

	async loadList(q, offset) {
		const res = await fetch(`https://openlibrary.org/search.json?q=${q}&offset=${offset}`)
		return res.json()
	}

	render() {
		this.app.innerHTML = ''
		this.renderHeader()
		this.renderSearch()
		this.renderCard()
	}

	renderHeader() {
		const header = new Header(this.appstate).render()
		this.app.prepend(header)
	}

	renderSearch() {
		const search = new Search(this.state).render()
		this.app.append(search)
	}

	renderCard() {
		const cards = new CardList(this.appstate, this.state).render()
		this.app.append(cards)
	}
}