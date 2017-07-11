export default function Service(uuid, Parent, util, characteristic) {
  function ReduxService() {
    Parent.call(this, {
      uuid,
      characteristics: [characteristic],
    });
  }
  util.inherits(ReduxService, Parent);

  return new ReduxService();
}
