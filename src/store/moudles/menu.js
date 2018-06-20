const menu = {
  state: {
    menuRefresh: {}
  },
  mutations: {
    refreshMenu(state, menu) {
      state.menuRefresh[menu.path] = menu.refresh
    }
  },
  actions: {
  }
}

export default menu