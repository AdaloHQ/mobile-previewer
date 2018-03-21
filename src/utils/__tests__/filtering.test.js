import { selectors } form '@protonapp/proton-constants'

import { generateFilter } from '../filtering'

const CURRENT_USER_ID = 1234

const source = {
  type: 'hasManyRelation',
  fieldId: 'c_group_id',
  tableId: 't_events',
  dataType: 'list',
  datasourceId: 'datasource_1',
  source: {
    type: 'manyToManyRelation',
    fieldId: 'users_groups',
    tableId: 't_groups',
    dataType: 'list',
    datasourceId: 'datasource_1',
    source: {
      type: 'data',
      tableId: 't_users',
      dataType: 'object',
      selector: {
        type: 'CURRENT_USER_SELECTOR'
      },
      datasourceId: 'datasource_1'
    }
  }
}

const filterObj = {
  relation: [
    {
      targetTable: 't_groups',
      type: 'hasManyRelation',
      fieldId: 'c_group_id'
    },
    {
      targetTable: 't_groups',
      type: 'hasManyRelation',
      fieldId: 'c_group_id'
    }
  ],
  fieldId: 'id',
  value: '1234'
}

describe('generateFilter()', () => {
  test('basic', () => {
    let source = {

    }

    expect(generateFilter(source)).toEqual(undefined)
  })
})
