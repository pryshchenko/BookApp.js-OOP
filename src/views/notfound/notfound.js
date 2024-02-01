import { AbstractView } from '../../common/view.js';

export class NotFoundView extends AbstractView {
	constructor() {
		super()
		this.setTitle('404 - Страница не найдена!')
	}

	render() {
		const main = document.createElement('div')
		main.innerHTML = '404 - Страница не найдена!'
		this.app.innerHTML = ''
		this.app.append(main)
	}
}