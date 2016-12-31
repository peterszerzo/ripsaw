describe('MasterPiecePermissions', function () {
  var mpp

  it('stores boolean values under "draw", "edit", "pan", "zoom" and "rotate" keys specifying whether these actions can be performed on the object', function () {
    mpp = new RIPSAW.MasterPiecePermissions()

    expect(typeof mpp.draw).toEqual('boolean')
    expect(typeof mpp.edit).toEqual('boolean')
    expect(typeof mpp.pan).toEqual('boolean')
    expect(typeof mpp.zoom).toEqual('boolean')
    expect(typeof mpp.rotate).toEqual('boolean')
  })

  it('sets permissions to draw and edit only if no binary string is passed', function () {
    mpp = new RIPSAW.MasterPiecePermissions()

    expect(mpp.draw).toEqual(true)
    expect(mpp.edit).toEqual(true)

    expect(mpp.pan).toEqual(false)
    expect(mpp.zoom).toEqual(false)
    expect(mpp.rotate).toEqual(false)
  })

  it('sets all permissions to true.', function () {
    mpp = new RIPSAW.MasterPiecePermissions('11111')

    expect(mpp.draw).toEqual(true)
    expect(mpp.edit).toEqual(true)
    expect(mpp.pan).toEqual(true)
    expect(mpp.zoom).toEqual(true)
    expect(mpp.rotate).toEqual(true)
  })

  it('if binary string is too short, set remaining permissions to false', function () {
    mpp = new RIPSAW.MasterPiecePermissions('111')

    expect(mpp.draw).toEqual(true)
    expect(mpp.edit).toEqual(true)
    expect(mpp.pan).toEqual(true)

    expect(mpp.zoom).toEqual(false)
    expect(mpp.rotate).toEqual(false)
  })
})
