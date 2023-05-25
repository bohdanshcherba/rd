export const getDate = ():string => {
  const currentDate = new Date()

  // Get the UTC time value
  const utcTime = currentDate.getTime()

  // Convert to local time zone offset (in minutes)
  const localOffset = currentDate.getTimezoneOffset()

  // Calculate the new time by adding 4 hours (in milliseconds)
  const newTime = utcTime - (4 * 60 * 60 * 1000)

  // Apply the local time zone offset
  const adjustedTime = newTime - (localOffset * 60 * 1000)

  // Create a new Date object with the adjusted time
  const adjustedDate = new Date(adjustedTime)
  return adjustedDate.toDateString()
}

export const getDateTime = ():Date => {
  const currentDate = new Date()

  // Get the UTC time value
  const utcTime = currentDate.getTime()

  // Convert to local time zone offset (in minutes)
  const localOffset = currentDate.getTimezoneOffset()

  // Calculate the new time by adding 4 hours (in milliseconds)
  const newTime = utcTime - (4 * 60 * 60 * 1000)

  // Apply the local time zone offset
  const adjustedTime = newTime - (localOffset * 60 * 1000)


  // Create a new Date object with the adjusted time
  return  new Date(adjustedTime)

}
