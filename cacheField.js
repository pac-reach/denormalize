import _ from 'lodash'
import migrate from './autoMigrate.js'

Mongo.Collection.prototype.cacheField = function(options) {

  check(options, {
    cacheField:String,
    fields:[String],
    transform:Match.Optional(Function),
    bypassSchema:Match.Optional(Boolean)
  })

  let collection = options.bypassSchema && Package['aldeed:collection2'] ? this._collection : this
  let cacheField = options.cacheField
  let fields = options.fields
  let topFields = _.uniq(_.map(fields, field => field.split('.')[0]))
  let transform = options.transform
  if(!transform) {
    transform = function(doc) {
      return _.compact(_.map(fields, field => _.get(doc, field))).join(', ')
    }
  }

  function insertHook(userid, doc){
    let val = transform(doc)
    console.log('CACHEFIELD INSERT', val)
    collection.update(doc._id, {$set:{[cacheField]:val}})
  }

  migrate(collection, insertHook, options)

  collection.after.insert(insertHook)

  collection.after.update((userId, doc, changedFields) => {
    if(_.intersection(changedFields, topFields).length){
      let val = transform(doc)
      if(!_.isEqual(val, _.get(doc, cacheField))){
        collection.update(doc._id, {$set:{[cacheField]:val}})
        console.log('CACHEFIELD UPDATE', val)
      }
    }
  })  
}
