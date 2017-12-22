import moment from 'moment'

export const relativeDate = dateString => {
  let dateObj = new Date(dateString)
  return moment(dateObj).fromNow()
}
