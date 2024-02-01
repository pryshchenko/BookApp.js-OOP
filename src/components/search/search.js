import { DivComponent } from '../../common/div-component';
import './search.css'

export class Search extends DivComponent {
	constructor(state) {
		super()
		this.state = state
	}

	search() {
		const value = document.querySelector('input').value
		this.state.searchQuery = value
	}

	render() {
		this.el.classList.add('search-input')
		this.el.innerHTML = `
		<form class="form-search">
			<div class="wrapper-search-input">
				<img class="input-search-img" src="static/img/search-input.svg" alt="search">
				<input class="search-input-place" type="text" value="${this.state.searchQuery ?? ''}" placeholder="Найти книгу или автора">
			</div>
			<button class="btn-search"><img src="static/img/search-button.svg" alt="search"></button>
		</form>
		`
		this.el.querySelector('button').addEventListener('click', (e) => {
			e.preventDefault()
			this.search()
		})

		this.el.querySelector('input').addEventListener('keydown', (e) => {
			if(e.code === 'Enter') {
				e.preventDefault()
				this.search()
			}
		})
		return this.el
	}
}