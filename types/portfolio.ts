export interface Skill {
    id: number;
    title: string;
}

export interface Portfolio {
    id: string;
    title: string;
    description: string;
    small_image: string;
    big_image: string;
    demo_link: string;
    github_repo: string;
    content: string;
    skill_title: string;
    created_at: Date;
}