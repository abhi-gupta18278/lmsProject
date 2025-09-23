import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';

const Footer = () => {
  const currDate = new Date()
  const year = currDate.getFullYear()
  return (

    <footer className=" relative left-0 bottom-0 min-h-[2vh] w-full py-5 sm:px-20 flex flex-col sm:flex-row justify-between text-white bg-gray-800">
      <section className='text-lg text-center sm:text-start'>
        Copyright({year}) | All rights reserved
      </section>
      <section className='flex items-center cursor-pointer  justify-center gap-5 text-2xl text-white'>
        <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
          <BsFacebook />

        </a>
        <a className='hover:text-yellow-500  cursor-pointer transition-all ease-in-out duration-300'>
          <BsInstagram />
        </a>
        <a className='hover:text-yellow-500  cursor-pointer transition-all ease-in-out duration-300'>
          <BsLinkedin />
        </a>
        <a className='hover:text-yellow-500  cursor-pointer transition-all ease-in-out duration-30'>
          <BsTwitter />
        </a>
      </section>

    </footer >


  )
}

export default Footer;
