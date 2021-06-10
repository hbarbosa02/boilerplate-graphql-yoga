export function compose(...fcns) {
  if (fcns.length === 0) return o => o
  if (fcns.length === 1) return fcns[0]

  return resolve =>
    fcns.reduceRight((fnPrevious, fn) => fn(fnPrevious), resolve)
}

export function authenticated(fn) {
  return (parent, args, ctx, info) => {
    if (!ctx.user) throw Error('Acesso não permitido.')

    return fn(parent, args, ctx, info)
  }
}
