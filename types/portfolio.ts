export interface Skill {
    id: number;
    title: string;
}

export interface Portfolio {
    id: string;
    title: string;
    description: string;
    image_url: string;
    demo_link: string;
    github_repo: string;
    content: string;
    skill_title: string;
    created_at: Date;
}