import moment from 'moment'

export const relativeDate = (integerDate) => {
  const dateObj = new Date(integerDate)
  return moment(dateObj).fromNow()
}
