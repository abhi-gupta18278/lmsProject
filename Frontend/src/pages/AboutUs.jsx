import aboutMainImage from '../assets/aboutMainImage.png'
import CarouselSlide from '../component/CarouselSlide';
import { celebrities } from '../constent/CelebrityData';
import HomeLayout from "../Layouts/HomeLayout";


const AboutUs = () => {
  return (
    <HomeLayout>
      <div className="p-4 pt-20 sm:pl-20 sm:pt-20 text-white">
        <div className="flex w-full h-full flex-col sm:flex-row sm:items-center gap-5 mx-10">
          <section className="w-full sm:w-1/2 pr-10 space-y-10">
            <h1 className="text-3xl sm:text-5xl text-yellow-500 font-semibold">
              Affordable and quality education
            </h1>
            <p className="text-sm sm:text-xl text-gray-200">
              Our goal is to provide the afoordable and quality education to the world.
              We are providing the platform for the aspiring teachers and students to share
              their skills, creativity and knowledge to each other to empower and contribute
              in the growth and wellness of mankind.
            </p>
          </section>
          <div className="w-2/3 sm:w-1/2 flex object-contain  ">
            <img
              id="test1"
              style={{
                filter: "drop-shadow(0px 10px 10px rgb(0,0,0));"
              }}
              alt="about main image"
              className="drop-shadow-2xl"
              src={aboutMainImage}
            />
          </div>
        </div>
        <div className="carousel w-1/2 m-auto my-16">
          {celebrities && celebrities.map(celebrity => (<CarouselSlide
            {...celebrity}
            key={celebrity.slideNumber}
            totalSlides={celebrities.length}

          />))}
        </div>
      </div>
    </HomeLayout>
  );
}

export default AboutUs;
