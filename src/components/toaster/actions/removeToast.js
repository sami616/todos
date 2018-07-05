export function removeToast(id) {
  this.setState(({ toasts }) => {
    const remainder = toasts.filter(toast => id !== toast.id)
    return {
      toasts: remainder
    }
  })
}
