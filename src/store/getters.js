//获取state的状态(类似component)
const getters = {
  getTheme(state) {
    return {
      bg_p: {
        background: state.theme.primary,
      },
      bg_a: {
        background: state.theme.assist,
      },
      co_p: {
        color: state.theme.primary === "#fff" ? "#222" : state.theme.primary,
      },
      co_a: {
        color: state.theme.primary === "#fff" ? "#222" : state.theme.assist,
      },
      co: {
        color: state.theme.primary === "#fff" ? "#222" : state.theme.color,
      },
      wcolor: {
        color: "#fff",
      },
    };
  },
  getMenu(state) {
    return state.menu;
  },
};

export default getters;
