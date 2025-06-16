// 음식 데이터 정의
const foods = [
    // 탄수화물
    { id: 'ramen', name: '라면', type: 'carbohydrate', image: 'images/라면.gif', sound: 'sounds/라면.mp3' },
    { id: 'potato', name: '감자', type: 'carbohydrate', image: 'images/감자.gif', sound: 'sounds/감자.mp3' },
    { id: 'rice', name: '쌀밥', type: 'carbohydrate', image: 'images/쌀밥.gif', sound: 'sounds/쌀밥.mp3' },
    { id: 'bread', name: '빵', type: 'carbohydrate', image: 'images/빵.gif', sound: 'sounds/빵.mp3' },
    
    // 비타민
    { id: 'orange', name: '오렌지', type: 'vitamin', image: 'images/오렌지.gif', sound: 'sounds/오렌지.mp3' },
    { id: 'apple', name: '사과', type: 'vitamin', image: 'images/사과.gif', sound: 'sounds/사과.mp3' },
    { id: 'carrot', name: '당근', type: 'vitamin', image: 'images/당근.gif', sound: 'sounds/당근.mp3' },
    { id: 'mushroom', name: '버섯', type: 'vitamin', image: 'images/버섯.gif', sound: 'sounds/버섯.mp3' },
    
    // 단백질
    { id: 'fish', name: '생선', type: 'protein', image: 'images/생선.gif', sound: 'sounds/생선.mp3' },
    { id: 'egg', name: '계란', type: 'protein', image: 'images/계란.gif', sound: 'sounds/계란.mp3' },
    { id: 'bean', name: '콩', type: 'protein', image: 'images/콩.gif', sound: 'sounds/콩.mp3' },
    { id: 'meat', name: '고기', type: 'protein', image: 'images/고기.gif', sound: 'sounds/고기.mp3' },
    
    // 지방
    { id: 'butter', name: '버터', type: 'fat', image: 'images/버터.gif', sound: 'sounds/버터.mp3' },
    { id: 'sugar', name: '설탕', type: 'fat', image: 'images/설탕.gif', sound: 'sounds/설탕.mp3' },
    { id: 'oil', name: '기름', type: 'fat', image: 'images/기름.gif', sound: 'sounds/기름.mp3' },
    { id: 'mayonnaise', name: '마요네즈', type: 'fat', image: 'images/마요네즈.gif', sound: 'sounds/마요네즈.mp3' },
    
    // 칼슘
    { id: 'milk', name: '우유', type: 'calcium', image: 'images/우유.gif', sound: 'sounds/우유.mp3' },
    { id: 'yogurt', name: '요거트', type: 'calcium', image: 'images/요거트.gif', sound: 'sounds/요거트.mp3' },
    { id: 'cheese', name: '치즈', type: 'calcium', image: 'images/치즈.gif', sound: 'sounds/치즈.mp3' },
    { id: 'anchovy', name: '멸치', type: 'calcium', image: 'images/멸치.gif', sound: 'sounds/멸치.mp3' }
];

// 점수 변수
let score = 0;

// 점수 업데이트 함수
function updateScore() {
    document.getElementById('score').textContent = score;
}

// 음식 아이템 생성 함수
function createFoodItems() {
    const foodContainer = document.getElementById('foodContainer');
    foodContainer.innerHTML = ''; // 기존 내용 초기화

    // 음식 배열을 랜덤하게 섞기
    const shuffledFoods = [...foods].sort(() => Math.random() - 0.5);

    shuffledFoods.forEach(food => {
        const foodItem = document.createElement('div');
        foodItem.className = 'food-item';
        foodItem.id = food.id;
        foodItem.draggable = true;
        foodItem.dataset.type = food.type;
        foodItem.dataset.sound = food.sound;
        
        const img = document.createElement('img');
        img.src = food.image;
        img.alt = food.name;
        img.draggable = false; // 이미지 자체는 드래그 불가능하게 설정
        
        // 클릭 이벤트 추가
        foodItem.addEventListener('click', () => {
            const sound = new Audio(food.sound);
            sound.play();
        });
        
        foodItem.appendChild(img);
        foodContainer.appendChild(foodItem);
    });

    // 드래그 앤 드롭 이벤트 리스너 설정
    setupDragAndDrop();
}

// 드래그 앤 드롭 이벤트 리스너 설정
function setupDragAndDrop() {
    const foodItems = document.querySelectorAll('.food-item');
    const bowls = document.querySelectorAll('.bowl-area');

    foodItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', item.id);
            item.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
        });

        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
        });
    });

    bowls.forEach(bowl => {
        bowl.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        });

        bowl.addEventListener('drop', (e) => {
            e.preventDefault();
            const foodId = e.dataTransfer.getData('text/plain');
            const foodItem = document.getElementById(foodId);
            const bowlType = bowl.parentElement.dataset.type;
            const foodType = foodItem.dataset.type;

            if (bowlType === foodType) {
                // 정답 처리
                const correctSound = new Audio('sounds/Glow3.mp3');
                correctSound.play();
                score += 1;
                updateScore();
                foodItem.style.display = 'none';
            } else {
                // 오답 처리
                const errorSound = new Audio('sounds/Error3.mp3');
                errorSound.play();
                score = Math.max(0, score - 1);
                updateScore();
            }
        });
    });
}

// 영양소 버튼 클릭 이벤트 처리
document.querySelectorAll('.nutrient-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const nutrientType = btn.dataset.nutrient;
        let soundFile;
        
        switch(nutrientType) {
            case '비타민':
                soundFile = 'sounds/비타민.mp3';
                break;
            case '탄수화물':
                soundFile = 'sounds/탄수화물.mp3';
                break;
            case '단백질':
                soundFile = 'sounds/단백질.mp3';
                break;
            case '지방':
                soundFile = 'sounds/지방.mp3';
                break;
            case '칼슘':
                soundFile = 'sounds/칼슘.mp3';
                break;
        }
        
        if (soundFile) {
            const sound = new Audio(soundFile);
            sound.play();
        }
    });
});

// 다시 시작하기 버튼 이벤트 리스너
document.getElementById('restartBtn').addEventListener('click', () => {
    // 정답 소리 재생
    const correctSound = new Audio('sounds/Glow3.mp3');
    correctSound.play();
    
    // 모든 음식 아이템 초기화
    const foodItems = document.querySelectorAll('.food-item');
    foodItems.forEach(item => {
        item.style.display = 'block';
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
    });

    // 점수 초기화
    score = 0;
    updateScore();
    
    // 음식 아이템 다시 생성
    createFoodItems();
});

// 페이지 로드 시 게임 시작
window.addEventListener('load', () => {
    createFoodItems();
});
