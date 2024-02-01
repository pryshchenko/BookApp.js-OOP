import { MainView } from './views/main/main.js'
import { NotFoundView } from './views/notfound/notfound.js'
import { Favorites } from './views/favorites/favorites.js'

class App {
	routes = [
		{ path: "", view: MainView },
		{ path: "#404", view: NotFoundView },
		{ path: "#favorites", view: Favorites }
	]
	appState = {
		favorites: []
	}
	constructor() {
		window.addEventListener('hashchange', this.route.bind(this))
		this.route()
	}
	route() {
		const view = this.routes.find(r => r.path === location.hash)?.view
		if(!view) {
			const notFound = new this.routes[1].view()
			notFound.render()
			return
		}
		if(this.currentView) {
			this.currentView.destroy()
		}
		this.currentView = new view(this.appState)
		this.currentView.render()
	}
}

new App()