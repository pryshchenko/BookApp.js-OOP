import { DivComponent } from '../../common/div-component';
import { Card } from '../card/card';
import './cardList.css'

export class CardList extends DivComponent {
	constructor(appstate, parentstate) {
		super()
		this.parentstate = parentstate
		this.appstate = appstate
	}

	offsetPlus(e) {
		e.preventDefault()
		this.parentstate.offset = this.parentstate.offset + 1
	}

	offsetMinus(e) {
		e.preventDefault()
		if (this.parentstate.offset) {
			this.parentstate.offset = this.parentstate.offset -1
		}
	}

	render() {
		if (this.parentstate.loading) {
			this.el.classList.add("loader-wrapper")
			this.el.innerHTML = '<span class="loader"></span>'
			return this.el
		}
		this.el.classList.add('main')
		this.el.innerHTML = `<h2 class="result-book-list">Найдено книг - ${this.parentstate.numFound}</h2>`
		this.bookRes = document.createElement('div')
		this.bookRes.classList.add('book-result')
		this.el.append(this.bookRes)
		for (const card of this.parentstate.list) {
			this.bookRes.append(new Card(this.appstate, card).render())
		}
		this.footer = document.createElement('div')
		this.footer.classList.add('footer')
		this.footer.innerHTML = `<a class="leftarrow" href=""><img src="static/img/arrow-left.svg" alt="arrow-left">Предыдущая страница</a>
		<a class="rightarrow" href="#">Следующая страница<img src="static/img/arrow-right.svg" alt="arrow-right"></a>`
		this.footer.querySelector('.rightarrow').addEventListener('click', this.offsetPlus.bind(this))
		this.footer.querySelector('.leftarrow').addEventListener('click', (e) => this.offsetMinus(e))
		if (this.parentstate.numFound) {
			this.el.append(this.footer)
		}
		return this.el
	} 
}