import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Course } from '../types';
import { BookOpen, Clock, Award } from 'lucide-react';

export const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await api.getCourses();
      setCourses(data);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-obsidian pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-gold-200 to-gold-600 mb-4">
            Accademia Online
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
             Padroneggia l'arte del PMU e del Tatuaggio con i nostri corsi di formazione d'élite. 
             Impara direttamente da Elena Parvu.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
             [1, 2, 3].map(n => (
               <div key={n} className="bg-black border border-gray-900 h-[500px] animate-pulse">
                 <div className="h-64 bg-gray-900 w-full"></div>
                 <div className="p-8 space-y-4">
                   <div className="h-6 bg-gray-900 w-3/4"></div>
                   <div className="h-4 bg-gray-900 w-full"></div>
                   <div className="h-4 bg-gray-900 w-full"></div>
                 </div>
               </div>
             ))
          ) : (
            courses.map((course) => (
              <div key={course.id} className="bg-black border border-gray-900 hover:border-gold-500/50 transition-all duration-300 group flex flex-col">
                
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute top-4 right-4 bg-gold-500 text-black text-xs font-bold px-3 py-1 uppercase tracking-wider">
                    {course.level}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="font-serif text-2xl text-white mb-3 group-hover:text-gold-200 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 flex-1 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-8 border-y border-gray-900 py-4">
                    <div className="flex items-center gap-2 text-gray-500">
                      <BookOpen size={16} className="text-gold-500" />
                      <span className="text-xs uppercase tracking-wider">{course.modules} Moduli</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Clock size={16} className="text-gold-500" />
                      <span className="text-xs uppercase tracking-wider">{course.duration}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center">
                    <span className="font-serif text-xl text-white">€{course.price.toFixed(2)}</span>
                    <button className="px-6 py-2 border border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-black uppercase text-xs tracking-widest transition-all">
                      Iscriviti
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* CTA */}
        <div className="mt-24 p-12 bg-gradient-to-r from-gray-900 to-black border border-gray-800 text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
           <Award className="w-12 h-12 text-gold-500 mx-auto mb-6" />
           <h2 className="font-serif text-3xl text-white mb-4">Certificazione Internazionale</h2>
           <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
             Al completamento di ogni corso, riceverai un certificato di eccellenza firmato da Elena Parvu, riconosciuto a livello internazionale nel settore PMU.
           </p>
           <button className="px-8 py-3 bg-gold-500 text-black font-bold tracking-widest uppercase text-xs hover:bg-white transition-colors">
             Richiedi Maggiori Info
           </button>
        </div>
      </div>
    </div>
  );
};