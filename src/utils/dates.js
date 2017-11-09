import moment from 'moment'

export const relativeDate = integerDate => {
  let dateObj = new Date(integerDate)
  return moment(dateObj).fromNow()
}
