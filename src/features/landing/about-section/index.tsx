import Mapping from "@/components/mapping";

import { SKILLS } from "./constants";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Về tôi
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p className="text-lg">
                Tôi là một Full-stack Developer với hơn 3 năm kinh nghiệm trong
                việc xây dựng các ứng dụng web và mobile hiện đại. Đam mê của
                tôi là tạo ra những sản phẩm công nghệ có thể giải quyết các vấn
                đề thực tế và mang lại giá trị cho người dùng.
              </p>
              <p className="text-lg">
                Tôi có kinh nghiệm làm việc với nhiều công nghệ khác nhau, từ
                frontend đến backend, và luôn eager để học hỏi những công nghệ
                mới. Ngoài việc coding, tôi còn thích chia sẻ kiến thức thông
                qua blog và tham gia vào các dự án open source.
              </p>
              <p className="text-lg">
                Khi không ngồi trước máy tính, tôi thích đọc sách, chơi game, và
                khám phá những địa điểm mới. Tôi tin rằng việc có những sở thích
                đa dạng giúp mình có cái nhìn rộng hơn và sáng tạo hơn trong
                công việc.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Kỹ năng chính
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Mapping
                  data={SKILLS}
                  as="div"
                  keyProps="title"
                  transform={({ title }) => ({
                    key: title,
                    className:
                      "bg-white dark:bg-gray-700 rounded-lg p-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm",
                    children: title,
                  })}
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Triết lý làm việc
              </h3>
              <blockquote className="text-gray-600 dark:text-gray-300 italic">
                &quot;Code is like humor. When you have to explain it, it&apos;s
                bad.&quot;
              </blockquote>
              <p className="text-gray-600 dark:text-gray-300 mt-3">
                Tôi luôn cố gắng viết code sạch, dễ hiểu và có thể maintain.
                Quan trọng hơn cả, tôi tin rằng công nghệ tốt nhất là công nghệ
                người dùng không cần phải nghĩ về nó.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
