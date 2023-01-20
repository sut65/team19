import React from "react";
// Component
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import CardBlog from "./CardBlog";
import { Margin } from "@mui/icons-material";

// Mockup
const articles = [
  {
    id: 1,
    author: "Panda",
    slug: "how-to-learn-react.js",
    title: "How to learn react.js",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    coverImg:
      "https://images.unsplash.com/photo-1605007493699-af65834f8a00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",

    category: "programming",
    tagList: "react",
  },
  {
    id: 2,
    author: "John Doe",
    slug: "ไปญี่ปุ่นตอนฝนตกได้ไม่หวั่น-เที่ยวมันส์ได้แม้เจอมรสุม",
    title: "ไปญี่ปุ่นตอนฝนตกได้ไม่หวั่น เที่ยวมันส์ได้แม้เจอมรสุม",
    description:
      "“ใครๆ ก็ไปญี่ปุ่น” เพราะที่นี่คือประเทศยอดฮิตติดท๊อปเทรนด์ของคนไทยมาเนิ่นนาน",
    content:
      "“ใครๆ ก็ไปญี่ปุ่น” เพราะที่นี่คือประเทศยอดฮิตติดท๊อปเทรนด์ของคนไทยมาเนิ่นนาน แต่ก็เป็นที่รู้กันดีว่าอุปสรรคสำคัญของญี่ปุ่น ก็คือสภาพอากาศที่มีความแปรปรวนเอาแน่เอานอนไม่ค่อยได้ โดยเฉพาะใครที่อยากไปเที่ยวช่วงฤดูมรสุม (เดือน ก.ย.- ต.ค. ของแต่ละปี) โดยเฉพาะเมื่อช่วงกลางเดือนตุลาคม 2562 ที่ผ่านมา ได้มีพายุไต้ฝุ่นหมายเลข 19 ที่ชื่อว่า “ฮากีบิส” เข้ามาประชิดกับชายฝั่งญี่ปุ่นจนทำให้เกิดฝนตกหนัก ส่งผลให้เกิดน้ำท่วมเสียหายในบางพื้นที่รวมถึงทางรถไฟบางเส้นก็ถูกตัดขาด ส่งผลให้การเดินทางต้องหยุดชะงักเพราะเที่ยวบินยกเลิก รถไฟหยุดวิ่งทุกเส้นทาง",
    coverImg:
      "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    category: "travel",
    tagList: "มทส",
  },
  {
    id: 3,
    author: "Dang Guitar",
    slug: "เที่ยวฝรั่งเศสด้วยงบประหยัด",
    title: "เที่ยวฝรั่งเศสด้วยงบประหยัด",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    coverImg:
      "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    category: "travel",
    tagList: "europe",
  },
  {
    id: 4,
    author: "Speed",
    slug: "ปลูกเดหลี",
    title: "ปลูกเดหลี",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    content:
      "เดหลี (Peace Lily, ชื่อวิทยาศาสตร์คือ Spathiphyllum Species) ต้นไม้ในร่มที่ช่วยดูดซับและกำจัดสารเบนซิน ฟอร์มาลดีไฮด์ ไตรคลอโรเอทิลีน แอมโมเนีย ไซลีน โทลูอีน และสารมลพิษอื่น ๆ ในอากาศได้ มีอายุหลายปี สีขาวสวย มีกลิ่นหอม ความสูงประมาณ 40-70 เซนติเมตร ปลูกใส่กระถางสานเก๋ ๆ ไว้ในห้องได้",
    coverImg:
      "https://images.unsplash.com/photo-1616694547693-b0f829a6cf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1190&q=80",
    category: "flower",
    tagList: "ปลูกดอกไม้กันเถอะ",
  },
];

function ShowCardBlog() {
  return (
    <Box
      sx={{
        maxWidth: "1024px",
        margin: "2rem auto"
      }}
    >
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {articles.map((item) => {
          return (
            <Grid item xs={6} sm={4} md={4} key={item.id}>
              <CardBlog
                id={item.id}
                coverImage={item.coverImg}
                title={item.title}
                content={item.content}
                category={item.category}
                tag={item.tagList}
                author={item.author}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default ShowCardBlog;
