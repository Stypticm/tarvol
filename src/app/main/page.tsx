'use client'

const page = () => {
  return (
    <div className='w-full h-full flex justify-center items-center p-2'>
      <iframe src="https://sslecal2.investing.com/?columns=timezone&countries=25,4,17,39,72,26,10,6,37,43,56,36,5,61,22,12,35&calType=week&timeZone=18&lang=7"
      style={{padding: '2px'}}
        className='rounded-lg overflow-auto sm:w-1/2 w-full h-full'
      />
    </div>
  )
}

export default page