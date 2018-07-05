export function addToast(toast) {
  this.setState(({ toasts }) => ({
    toasts: [...toasts, { ...toast, id: new Date().valueOf() }]
  }))
}
